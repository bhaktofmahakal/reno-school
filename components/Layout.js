import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>🏫 School Management System</h1>
        </div>
      </header>
      
      <nav className="nav">
        <div className="container">
          <div className="nav-container">
            <Link 
              href="/showSchools" 
              className={`nav-link ${router.pathname === '/showSchools' ? 'active' : ''}`}
            >
              🏫 Show Schools
            </Link>
            <Link 
              href="/addSchool" 
              className={`nav-link ${router.pathname === '/addSchool' ? 'active' : ''}`}
            >
              ➕ Add School
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="container">
        {children}
      </main>
    </div>
  );
}