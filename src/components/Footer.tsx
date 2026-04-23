export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl uppercase">K</span>
              </div>
              <span className="text-xl font-bold text-white font-display">Kids Castle</span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering little minds to dream big. Our preschool provide a safe, nurturing, and high-quality learning environment for your child.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-brand-primary transition-colors text-slate-300">Home</a></li>
              <li><a href="#programs" className="hover:text-brand-primary transition-colors text-slate-300">Programs</a></li>
              <li><a href="#facilities" className="hover:text-brand-primary transition-colors text-slate-300">Facilities</a></li>
              <li><a href="#contact" className="hover:text-brand-primary transition-colors text-slate-300">Admissions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex gap-3">
                <span className="text-brand-primary">📍</span>
                123 Dream Avenue, Creative Square, Education City
              </li>
              <li className="flex gap-3">
                <span className="text-brand-primary">📞</span>
                +1 (555) 000-1234
              </li>
              <li className="flex gap-3">
                <span className="text-brand-primary">✉️</span>
                hello@kidscastle.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-brand-primary transition-colors cursor-pointer">FB</div>
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-brand-primary transition-colors cursor-pointer">IG</div>
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-brand-primary transition-colors cursor-pointer">YT</div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs">
          <p>© {new Date().getFullYear()} Kids Castle Preschool. All rights reserved. Designed for Premium Experience.</p>
        </div>
      </div>
    </footer>
  );
}
