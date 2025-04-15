import type { NextFetchEvent, NextRequest } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './libs/i18nNavigation';
import { checkRole } from './libs/permissions';

const intlMiddleware = createMiddleware(routing);

const isAuthorizedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/:locale/dashboard(.*)',
]);

const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/:locale/admin(.*)',
]);

const isAuthPage = createRouteMatcher([
  '/sign-in(.*)',
  '/:locale/sign-in(.*)',
  '/sign-up(.*)',
  '/:locale/sign-up(.*)',
]);

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  // Run Clerk middleware only when it's necessary
  if (
    isAuthPage(request) || isAuthorizedRoute(request) || isProtectedRoute(request)
  ) {
    return clerkMiddleware(async (auth, req) => {
      if (isAuthorizedRoute(req)) {
        const locale
          = req.nextUrl.pathname.match(/(\/.*)\/dashboard/)?.at(1) ?? '';

        const signInUrl = new URL(`${locale}/sign-in`, req.url);

        console.log('is auth, redirecting to dashboard');
        await auth.protect({
          // `unauthenticatedUrl` is needed to avoid error: "Unable to find `next-intl` locale because the middleware didn't run on this request"
          unauthenticatedUrl: signInUrl.toString(),
        });
      }
      if (isProtectedRoute(req)) {
        const { sessionClaims } = await auth();

        if (!(await checkRole('admin', sessionClaims))) {
          console.log('not admin, redirecting to dashboard');
          return NextResponse.redirect(new URL('/dashboard', req.url));
        }
      }

      return intlMiddleware(req);
    })(request, event);
  }

  // Extract the URL pathname from the request
  const path = request.nextUrl.pathname;

  // Allow direct access to sitemap.xml and robots.txt without i18n middleware processing
  // This ensures these files are properly served for SEO purposes
  // Related to GitHub issue: https://github.com/ixartz/Next-js-Boilerplate/issues/356
  if (path === '/sitemap.xml' || path === '/robots.txt') {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
