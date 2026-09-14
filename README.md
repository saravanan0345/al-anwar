# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Consultation email

Consultation submissions are saved to Supabase and emailed through Resend. Configure these server-side variables before deploying:

```sh
RESEND_API_KEY=re_xxxxxxxxx
RESEND_NOTIFY_TO=alanwarbuilddesign@gmail.com
```

`RESEND_NOTIFY_TO` defaults to `alanwarbuilddesign@gmail.com`. The Resend account must be allowed to send from `onboarding@resend.dev`, or `src/lib/enquiry.functions.ts` should be updated to use a verified sender domain.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
