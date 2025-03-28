import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { BaseTemplate } from '@/templates/BaseTemplate';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'RootLayout',
  });

  return (
    <>
      <BaseTemplate
        leftNav={(
          <>
            <li>
              <Link
                href="/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('home_link')}
              </Link>
            </li>
            <li>
              <Link
                href="/artifacts/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('artifacts_link')}
              </Link>
            </li>
            <li>
              <Link
                href="/create/artifact/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('create_artifacts_link')}
              </Link>
            </li>
            <li>
              <Link
                href="/projects/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('projects_link')}
              </Link>
            </li>
            <li>
              <Link
                href="/teams/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('teams_link')}
              </Link>
            </li>
            <li>
              <Link
                href="/users/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('users_link')}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('admin_link')}
              </Link>
            </li>
            <li>
              <a
                className="border-none text-gray-700 hover:text-gray-900"
                href="https://github.com/ixartz/Next-js-Boilerplate"
              >
                GitHub
              </a>
            </li>
          </>
        )}
        rightNav={(
          <>
            <li>
              <ThemeSwitcher />
            </li>
            <li>
              <Link
                href="/sign-in/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('sign_in_link')}
              </Link>
            </li>

            <li>
              <Link
                href="/sign-up/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t('sign_up_link')}
              </Link>
            </li>

            <li>
              <LocaleSwitcher />
            </li>
          </>
        )}
      >
        <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
      </BaseTemplate>
    </>
  );
}
