CREATE OR REPLACE FUNCTION get_similar_artifacts(
    input_artifact_id INTEGER, 
    max_results INTEGER DEFAULT 3, 
    similarity_weight_category FLOAT DEFAULT 0.6, 
    similarity_weight_tags FLOAT DEFAULT 0.4
) RETURNS TABLE (
    id INTEGER,
    title VARCHAR(255),
    description TEXT,
    category_id INTEGER,
    category_slug VARCHAR(50),
    similarity_score FLOAT
) AS $$
BEGIN
    RETURN QUERY WITH 
    -- Get the input artifact's category and tags
    input_artifact_info AS (
        SELECT 
            a.category_id,
            ac.slug AS category_slug,
            array_agg(DISTINCT at.name) AS artifact_tags
        FROM artifacts a
        JOIN artifact_categories ac ON a.category_id = ac.id
        LEFT JOIN artifacts_to_artifact_tags atat ON a.id = atat.artifact_id
        LEFT JOIN artifact_tags at ON atat.artifact_tag_id = at.id
        WHERE a.id = input_artifact_id
        GROUP BY a.category_id, ac.slug
    ),
    
    -- Calculate similarity scores for other artifacts
    similar_artifacts AS (
        SELECT 
            a.id,
            a.title,
            a.description,
            a.category_id,
            ac.slug AS category_slug,
            (
                -- Category similarity (exact match)
                CASE WHEN a.category_id = (SELECT category_id FROM input_artifact_info)
                     THEN similarity_weight_category 
                     ELSE 0 
                END +
                
                -- Tag similarity (Jaccard-like similarity)
                similarity_weight_tags * (
                    SELECT 
                        COALESCE(
                            CARDINALITY(
                                ARRAY(
                                    SELECT UNNEST(artifact_tags) 
                                    INTERSECT 
                                    SELECT UNNEST((
                                        SELECT artifact_tags 
                                        FROM input_artifact_info
                                    ))
                                )
                            )::FLOAT / 
                            GREATEST(
                                CARDINALITY((SELECT artifact_tags FROM input_artifact_info)),
                                CARDINALITY(artifact_tags)
                            ),
                            0
                        )
                    FROM (
                        SELECT array_agg(DISTINCT at.name) AS artifact_tags
                        FROM artifacts_to_artifact_tags atat 
                        JOIN artifact_tags at ON atat.artifact_tag_id = at.id
                        WHERE atat.artifact_id = a.id
                    ) tag_subquery
                )
            ) AS similarity_score
        FROM artifacts a
        JOIN artifact_categories ac ON a.category_id = ac.id
        WHERE a.id != input_artifact_id
    )
    
    -- Select top similar artifacts, sorted by similarity score
    SELECT 
        sa.id, 
        sa.title, 
        sa.description, 
        sa.category_id, 
        sa.category_slug,
        sa.similarity_score
    FROM similar_artifacts sa
    WHERE sa.similarity_score > 0
    ORDER BY sa.similarity_score DESC
    LIMIT max_results;
END;
$$ LANGUAGE plpgsql;