import { Link } from 'react-router-dom';
import { CheckSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-deepbrown text-primary-foreground">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <CheckSquare className="w-7 h-7 text-primary-foreground" />
              <span className="font-heading text-2xl text-primary-foreground">
                TaskFlow
              </span>
            </div>
            <p className="font-paragraph text-primary-foreground/80 leading-relaxed">
              A mindful approach to task management that helps you stay organized, focused, and productive in your daily workflow.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading text-xl text-primary-foreground mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  All Tasks
                </Link>
              </li>
              <li>
                <Link 
                  to="/tasks/new" 
                  className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Create Task
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading text-xl text-primary-foreground mb-6">
              About
            </h3>
            <p className="font-paragraph text-primary-foreground/80 leading-relaxed">
              TaskFlow helps you organize your work with clarity and intention, bringing balance to your productivity journey.
            </p>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="font-paragraph text-center text-primary-foreground/60">
            © {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
