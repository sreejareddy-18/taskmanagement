import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Trash2, CheckCircle2, Clock, AlertCircle, Calendar } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Tasks } from '@/entities';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Tasks | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTask();
  }, [id]);

  const loadTask = async () => {
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getById<Tasks>('tasks', id!);
      setTask(data);
    } catch (error) {
      console.error('Failed to load task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await BaseCrudService.delete('tasks', id!);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-primary" />;
      case 'in progress':
        return <Clock className="w-6 h-6 text-primary" />;
      case 'pending':
        return <AlertCircle className="w-6 h-6 text-primary" />;
      default:
        return <Clock className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      
      <div className="w-full py-12 min-h-[70vh]">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="mb-8 text-secondary-foreground hover:text-primary font-paragraph"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tasks
            </Button>
          </Link>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : !task ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h2 className="font-heading text-4xl text-foreground mb-4">
                Task Not Found
              </h2>
              <p className="font-paragraph text-lg text-secondary-foreground mb-8">
                The task you're looking for doesn't exist or has been deleted.
              </p>
              <Link to="/">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 rounded-full font-paragraph">
                  View All Tasks
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <div className="bg-background border border-primary/20 rounded-2xl p-8 md:p-12">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(task.status)}
                        <span className="text-lg font-paragraph text-primary capitalize">
                          {task.status || 'Pending'}
                        </span>
                      </div>
                      {task.priority && (
                        <span className={`text-sm font-paragraph px-4 py-2 rounded-full ${
                          task.priority.toLowerCase() === 'high' 
                            ? 'bg-destructive/10 text-destructive' 
                            : task.priority.toLowerCase() === 'medium'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-deepbrown/10 text-deepbrown'
                        }`}>
                          {task.priority} Priority
                        </span>
                      )}
                    </div>

                    <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6 leading-tight">
                      {task.title}
                    </h1>

                    {task.description && (
                      <div className="mb-8">
                        <h2 className="font-heading text-2xl text-foreground mb-4">
                          Description
                        </h2>
                        <p className="font-paragraph text-lg text-secondary-foreground leading-relaxed whitespace-pre-wrap">
                          {task.description}
                        </p>
                      </div>
                    )}

                    {task.dueDate && (
                      <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/20">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-sm font-paragraph text-secondary-foreground/70">
                            Due Date
                          </div>
                          <div className="font-paragraph text-lg text-foreground">
                            {new Date(task.dueDate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="bg-background border border-primary/20 rounded-2xl p-6">
                    <h3 className="font-heading text-xl text-foreground mb-6">
                      Actions
                    </h3>
                    <div className="space-y-3">
                      <Link to={`/tasks/${id}/edit`} className="block">
                        <Button 
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-full font-paragraph"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Task
                        </Button>
                      </Link>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline"
                            className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructiveforeground h-12 rounded-full font-paragraph"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Task
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-heading text-2xl">
                              Delete Task
                            </AlertDialogTitle>
                            <AlertDialogDescription className="font-paragraph text-base">
                              Are you sure you want to delete this task? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="font-paragraph rounded-full">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={handleDelete}
                              className="bg-destructive text-destructiveforeground hover:bg-destructive/90 font-paragraph rounded-full"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                    <h3 className="font-heading text-xl text-foreground mb-4">
                      Task Details
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-paragraph text-secondary-foreground/70 mb-1">
                          Created
                        </div>
                        <div className="font-paragraph text-foreground">
                          {task._createdDate ? new Date(task._createdDate).toLocaleDateString() : 'N/A'}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-paragraph text-secondary-foreground/70 mb-1">
                          Last Updated
                        </div>
                        <div className="font-paragraph text-foreground">
                          {task._updatedDate ? new Date(task._updatedDate).toLocaleDateString() : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
