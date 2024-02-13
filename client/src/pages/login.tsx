export const Login = () => {
  return (
    <main className="container">
      <form>
        <input
          type="email"
          name="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
        />

        <button type="submit">Login</button>
      </form>
    </main>
  );
};
