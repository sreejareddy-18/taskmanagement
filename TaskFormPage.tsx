import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Tasks } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TaskFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = id !== 'new';
  
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    if (isEditMode) {
      loadTask();
    }
  }, [id]);

  const loadTask = async () => {
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getById<Tasks>('tasks', id!);
      if (data) {
        setFormData({
          title: data.title || '',
          description: data.description || '',
          status: data.status || 'pending',
          priority: data.priority || 'medium',
          dueDate: data.dueDate ? new Date(data.dueDate).toISOString().split('T')[0] : '',
        });
      }
    } catch (error) {
      console.error('Failed to load task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      return;
    }

    try {
      setIsSaving(true);
      
      if (isEditMode) {
        await BaseCrudService.update<Tasks>('tasks', {
          _id: id!,
          title: formData.title,
          description: formData.description,
          status: formData.status,
          priority: formData.priority,
          dueDate: formData.dueDate || undefined,
        });
        navigate(`/tasks/${id}`);
      } else {
        const newTask = await BaseCrudService.create<Tasks>('tasks', {
          _id: crypto.randomUUID(),
          title: formData.title,
          description: formData.description,
          status: formData.status,
          priority: formData.priority,
          dueDate: formData.dueDate || undefined,
        });
        navigate(`/tasks/${newTask._id}`);
      }
    } catch (error) {
      console.error('Failed to save task:', error);
      setIsSaving(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      
      <div className="w-full py-12 min-h-[70vh]">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <Link to={isEditMode ? `/tasks/${id}` : '/'}>
            <Button 
              variant="ghost" 
              className="mb-8 text-secondary-foreground hover:text-primary font-paragraph"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isEditMode ? 'Back to Task' : 'Back to Tasks'}
            </Button>
          </Link>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-background border border-primary/20 rounded-2xl p-8 md:p-12">
                <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-3">
                  {isEditMode ? 'Edit Task' : 'Create New Task'}
                </h1>
                <p className="font-paragraph text-lg text-secondary-foreground mb-8">
                  {isEditMode 
                    ? 'Update your task details below' 
                    : 'Fill in the details to create a new task'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="font-paragraph text-base text-foreground mb-2 block">
                      Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      placeholder="Enter task title"
                      required
                      className="h-12 font-paragraph border-primary/30 focus:border-primary rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="font-paragraph text-base text-foreground mb-2 block">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder="Enter task description"
                      rows={6}
                      className="font-paragraph border-primary/30 focus:border-primary rounded-xl resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="status" className="font-paragraph text-base text-foreground mb-2 block">
                        Status
                      </Label>
                      <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                        <SelectTrigger className="h-12 border-primary/30 font-paragraph rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="priority" className="font-paragraph text-base text-foreground mb-2 block">
                        Priority
                      </Label>
                      <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                        <SelectTrigger className="h-12 border-primary/30 font-paragraph rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dueDate" className="font-paragraph text-base text-foreground mb-2 block">
                      Due Date
                    </Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleChange('dueDate', e.target.value)}
                      className="h-12 font-paragraph border-primary/30 focus:border-primary rounded-xl"
                    />
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button
                      type="submit"
                      disabled={isSaving || !formData.title.trim()}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-14 rounded-full font-paragraph text-lg"
                    >
                      {isSaving ? (
                        <>
                          <LoadingSpinner />
                          <span className="ml-2">Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          {isEditMode ? 'Update Task' : 'Create Task'}
                        </>
                      )}
                    </Button>
                    <Link to={isEditMode ? `/tasks/${id}` : '/'} className="flex-1">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-primary/30 text-foreground hover:bg-primary/5 h-14 rounded-full font-paragraph text-lg"
                      >
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
