// HPI 1.7-V
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Plus, Filter, CheckCircle2, Clock, AlertCircle, ArrowRight, LayoutGrid, List as ListIcon, ArrowUpRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Tasks } from '@/entities';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export default function HomePage() {
  // ---------------------------------------------------------------------------
  // DATA FIDELITY PROTOCOL: CANONICAL DATA SOURCES
  // ---------------------------------------------------------------------------
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // PRESERVED LOGIC: Data Fetching
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Tasks>('tasks');
      setTasks(result.items);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // PRESERVED LOGIC: Filtering & Helpers
  const filteredTasks = filterStatus === 'all' 
    ? tasks 
    : tasks.filter(task => task.status?.toLowerCase() === filterStatus.toLowerCase());

  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-primary" />;
      case 'in progress':
        return <Clock className="w-5 h-5 text-primary" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-primary" />;
      default:
        return <Clock className="w-5 h-5 text-primary" />;
    }
  };

  const getStatusCount = (status: string) => {
    return tasks.filter(task => task.status?.toLowerCase() === status.toLowerCase()).length;
  };

  // ---------------------------------------------------------------------------
  // MOTION & SCROLL LOGIC
  // ---------------------------------------------------------------------------
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroParallax = useTransform(smoothProgress, [0, 0.2], [0, 100]);
  const textParallax = useTransform(smoothProgress, [0, 0.2], [0, -50]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <Header />

      {/* ---------------------------------------------------------------------------
          HERO SECTION: Structural Replica of Inspiration Image
          Layout: Asymmetrical Grid with Hairline Borders
      --------------------------------------------------------------------------- */}
      <section className="relative w-full border-b border-deepbrown/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[90vh]">
          
          {/* LEFT COLUMN: Typography & Composition */}
          <div className="lg:col-span-7 relative flex flex-col justify-between border-r border-deepbrown/10 bg-background pt-24 pb-12 px-8 md:px-16 lg:px-24">
            
            {/* Main Content */}
            <div className="relative z-10 max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-deepbrown mb-8">
                  Find Clarity <br />
                  <span className="italic font-light text-primary">in Structure</span> <br />
                  & Purpose.
                </h1>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-paragraph text-lg md:text-xl text-deepbrown/70 max-w-md mb-12 leading-relaxed"
              >
                A refined workspace for your daily objectives. Organize, prioritize, and execute with a mindful approach to productivity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link to="/tasks/new" className="inline-block group">
                  <span className="font-paragraph text-lg underline decoration-1 underline-offset-4 group-hover:text-primary transition-colors duration-300">
                    Schedule a new task
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Bottom Right Grid Insert - Replicating the inspiration image motif */}
            <div className="hidden lg:flex absolute bottom-0 right-0 w-[280px] h-[280px] border-t border-l border-deepbrown/10 bg-background">
               <div className="relative w-full h-full p-6">
                  <div className="grid grid-cols-2 gap-4 h-full">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="relative w-full h-full rounded-lg overflow-hidden"
                    >
                       <Image 
                        src="https://static.wixstatic.com/media/f4bd3c_5b8c8f5e624646de8cc501ec16bea54b~mv2.png?originWidth=1152&originHeight=640" 
                        alt="Detail texture"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="relative w-full h-full rounded-lg overflow-hidden mt-8"
                    >
                       <Image 
                        src="https://static.wixstatic.com/media/f4bd3c_7b5d6f85ecee4820bd966ed1bd072c4e~mv2.png?originWidth=1152&originHeight=640" 
                        alt="Detail texture"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                    </motion.div>
                  </div>
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Full Bleed Image */}
          <div className="lg:col-span-5 relative h-[50vh] lg:h-auto overflow-hidden">
            <motion.div 
              style={{ y: heroParallax }}
              className="absolute inset-0 w-full h-[120%]"
            >
              <Image 
                src="https://static.wixstatic.com/media/f4bd3c_902e01a5a23c476bb6306c7ad10bdba7~mv2.png?originWidth=1152&originHeight=640" 
                alt="Abstract organic form"
                className="w-full h-full object-cover"
                width={1200}
              />
              <div className="absolute inset-0 bg-deepbrown/5 mix-blend-multiply" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------
          STATS SECTION: Minimalist Data Strip
          Layout: 3-Column Grid with Vertical Dividers
      --------------------------------------------------------------------------- */}
      <section className="w-full border-b border-deepbrown/10 bg-background">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-deepbrown/10">
          {[
            { label: 'Pending Actions', count: getStatusCount('pending'), delay: 0 },
            { label: 'In Progress', count: getStatusCount('in progress'), delay: 0.1 },
            { label: 'Completed Goals', count: getStatusCount('completed'), delay: 0.2 }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: stat.delay }}
              className="p-12 flex flex-col items-center justify-center text-center group hover:bg-deepbrown/5 transition-colors duration-500"
            >
              <span className="font-heading text-6xl md:text-7xl text-primary mb-2 group-hover:scale-110 transition-transform duration-500 ease-out">
                {stat.count}
              </span>
              <span className="font-paragraph text-sm uppercase tracking-widest text-deepbrown/60">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------------------
          PHILOSOPHY SECTION: Sticky Narrative
          Layout: Sticky Sidebar + Scrolling Content
      --------------------------------------------------------------------------- */}
      <section className="w-full py-24 md:py-32 border-b border-deepbrown/10">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Sticky Title */}
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <h2 className="font-heading text-4xl md:text-5xl text-deepbrown mb-6">
                  The Art of <br />
                  <span className="text-primary">Organization</span>
                </h2>
                <div className="w-12 h-1 bg-primary mb-8" />
                <p className="font-paragraph text-lg text-deepbrown/70 leading-relaxed">
                  We believe that true productivity comes not from doing more, but from seeing clearly. Our platform provides the canvas for your daily masterpiece.
                </p>
              </div>
            </div>

            {/* Scrolling Content */}
            <div className="lg:col-span-8 space-y-24">
              {[
                { title: "Mindful Planning", desc: "Approach every task with intention. Categorize, prioritize, and execute with a clear mind." },
                { title: "Seamless Flow", desc: "Experience a workflow that adapts to your rhythm, removing friction between thought and action." },
                { title: "Visual Clarity", desc: "A clutter-free interface designed to reduce cognitive load and enhance focus on what truly matters." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col md:flex-row gap-8 items-start group"
                >
                  <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-sm">
                    <Image 
                      src="https://static.wixstatic.com/media/f4bd3c_d1328f3c3e5c42cba1f7be62141cebdf~mv2.png?originWidth=576&originHeight=448" 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="w-full md:w-1/2 pt-4">
                    <span className="font-heading text-5xl text-deepbrown/10 mb-4 block">0{idx + 1}</span>
                    <h3 className="font-heading text-3xl text-deepbrown mb-4">{item.title}</h3>
                    <p className="font-paragraph text-deepbrown/70 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------
          VISUAL BREATHER: Full Bleed Parallax
      --------------------------------------------------------------------------- */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        <motion.div 
          style={{ y: textParallax }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <Image 
            src="https://static.wixstatic.com/media/f4bd3c_f3c9950d4ef34e338167a9995227800a~mv2.png?originWidth=1088&originHeight=640" 
            alt="Calm workspace atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-deepbrown/20" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl text-background text-center max-w-4xl px-4 leading-tight drop-shadow-lg"
          >
            "Simplicity is the ultimate sophistication."
          </motion.h2>
        </div>
      </section>

      {/* ---------------------------------------------------------------------------
          TASKS SECTION: The Core Functionality
          Layout: Magazine-Style Grid
      --------------------------------------------------------------------------- */}
      <section className="w-full py-24 bg-background min-h-screen" id="tasks">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-deepbrown/10 pb-8">
            <div>
              <h2 className="font-heading text-5xl md:text-6xl text-deepbrown mb-4">Your Agenda</h2>
              <p className="font-paragraph text-lg text-deepbrown/60">Manage your tasks with precision and grace.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-deepbrown/10 rounded-full shadow-sm">
                <Filter className="w-4 h-4 text-primary" />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[160px] border-none shadow-none bg-transparent font-paragraph text-deepbrown focus:ring-0 h-auto p-0">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tasks</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Link to="/tasks/new">
                <Button className="rounded-full h-12 px-8 bg-deepbrown text-background hover:bg-primary transition-colors duration-300 font-paragraph">
                  <Plus className="w-4 h-4 mr-2" />
                  New Task
                </Button>
              </Link>
            </div>
          </div>

          {/* Task Grid */}
          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 bg-deepbrown/5 animate-pulse rounded-sm" />
                ))}
              </div>
            ) : filteredTasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTasks.map((task, index) => (
                  <motion.div
                    key={task._id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/tasks/${task._id}`} className="block h-full">
                      <div className="relative h-full bg-white p-8 border border-deepbrown/10 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-deepbrown/5 flex flex-col justify-between min-h-[320px]">
                        
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(task.status)}
                            <span className="font-paragraph text-xs uppercase tracking-wider text-deepbrown/60">
                              {task.status || 'Pending'}
                            </span>
                          </div>
                          {task.priority && (
                            <span className={cn(
                              "text-xs font-paragraph px-3 py-1 rounded-full border",
                              task.priority.toLowerCase() === 'high' ? "border-destructive/30 text-destructive bg-destructive/5" :
                              task.priority.toLowerCase() === 'medium' ? "border-primary/30 text-primary bg-primary/5" :
                              "border-deepbrown/20 text-deepbrown/60"
                            )}>
                              {task.priority}
                            </span>
                          )}
                        </div>

                        {/* Card Content */}
                        <div className="mb-8">
                          <h3 className="font-heading text-2xl md:text-3xl text-deepbrown mb-4 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className="font-paragraph text-deepbrown/60 line-clamp-3 leading-relaxed">
                              {task.description}
                            </p>
                          )}
                        </div>

                        {/* Card Footer */}
                        <div className="flex items-center justify-between pt-6 border-t border-deepbrown/5 mt-auto">
                          <div className="text-sm font-paragraph text-deepbrown/40">
                            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                          </div>
                          <div className="w-8 h-8 rounded-full border border-deepbrown/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                            <ArrowUpRight className="w-4 h-4 text-deepbrown group-hover:text-white transition-colors duration-300" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-deepbrown/20 rounded-lg"
              >
                <div className="w-20 h-20 bg-deepbrown/5 rounded-full flex items-center justify-center mb-6">
                  <LayoutGrid className="w-10 h-10 text-deepbrown/40" />
                </div>
                <h3 className="font-heading text-3xl text-deepbrown mb-4">
                  A Clean Slate
                </h3>
                <p className="font-paragraph text-lg text-deepbrown/60 mb-8 max-w-md">
                  {filterStatus === 'all' 
                    ? 'Your workspace is empty. Begin by creating your first task.'
                    : `No tasks found with status "${filterStatus}".`}
                </p>
                <Link to="/tasks/new">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 rounded-full font-paragraph">
                    <Plus className="w-5 h-5 mr-2" />
                    Create First Task
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}