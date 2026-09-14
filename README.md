
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
