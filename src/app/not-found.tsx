export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8 text-center">
      <div>
        <h1 className="text-2xl font-bold">404 Not Found</h1>
        <p className="mt-2 text-muted-foreground">The page you requested does not exist.</p>
        <a href="/" className="mt-4 inline-block text-primary underline">
          Go home
        </a>
      </div>
    </div>
  );
}
