// src/components/layout/MainLayout.jsx
import Header from './Header';
import Footer from './Footer';

export default function MainLayout({ children }) {
   return (
     <div className="flex min-h-screen flex-col bg-gray-50">
       <Header />
       <main className="flex-1 p-6">
         {children}
       </main>
       <Footer />
     </div>
   );
}
