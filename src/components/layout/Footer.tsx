export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-primary">FoodHub</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Fresh meals from trusted restaurants — delivered with quality,
              convenience, and care.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Home</li>
              <li>Browse Meals</li>
              <li>Restaurants</li>
              <li>Become a Provider</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Login</li>
              <li>Register</li>
              <li>Contact Us</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} FoodHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
