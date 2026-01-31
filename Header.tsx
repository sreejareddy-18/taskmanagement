import { Link } from 'react-router-dom';
import { CheckSquare } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-secondary border-b border-primary/10">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <CheckSquare className="w-8 h-8 text-primary" />
            <span className="font-heading text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">
              TaskFlow
            </span>
          </Link>
          
          <nav className="flex items-center gap-8">
            <Link 
              to="/" 
              className="font-paragraph text-base text-secondary-foreground hover:text-primary transition-colors"
            >
              Tasks
            </Link>
            <Link 
              to="/tasks/new" 
              className="font-paragraph text-base text-secondary-foreground hover:text-primary transition-colors"
            >
              New Task
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
