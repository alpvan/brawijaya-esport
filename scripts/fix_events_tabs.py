import re
import sys

file_path = "d:/website/LandingBuatBEST/src/components/admin/EventsEditor.tsx"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()


content = content.replace(
    "const [editingId, setEditingId] = useState<string | null>(null);",
    "const [editingId, setEditingId] = useState<string | null>(null);\n    const [activeSection, setActiveSection] = useState<'basic' | 'details' | 'form'>('basic');"
)

tabs_jsx = """
                    <div className="flex overflow-x-auto gap-2 mb-6 pb-2 no-scrollbar border-b border-zinc-800">
                        <button 
                            type="button" 
                            onClick={() => setActiveSection('basic')}
                            className={`px-4 py-2 font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${activeSection === 'basic' ? 'border-[#00f0ff] text-[#00f0ff]' : 'border-transparent text-gray-500 hover:text-white'}`}
                        >
                            Informasi Dasar
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setActiveSection('details')}
                            className={`px-4 py-2 font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${activeSection === 'details' ? 'border-[#00f0ff] text-[#00f0ff]' : 'border-transparent text-gray-500 hover:text-white'}`}
                        >
                            Kotak Panel Detail
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setActiveSection('form')}
                            className={`px-4 py-2 font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${activeSection === 'form' ? 'border-[#00f0ff] text-[#00f0ff]' : 'border-transparent text-gray-500 hover:text-white'}`}
                        >
                            Form Pendaftaran
                        </button>
                    </div>
"""
content = content.replace(
    "<form onSubmit={handleSubmit} className=\"space-y-6\">",
    tabs_jsx + "\n                    <form onSubmit={handleSubmit} className=\"space-y-6\">"
)

content = content.replace(
    """                        <div className="space-y-4">
                            <h4 className="text-xs uppercase tracking-widest text-[#00f0ff] font-bold border-b border-zinc-800 pb-2">Informasi Dasar</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">""",
    """                        {activeSection === 'basic' && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">"""
)

# 4. Basic Section End & Details Section Start
content = content.replace(
    """                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs uppercase tracking-widest text-[#00f0ff] font-bold border-b border-zinc-800 pb-2">Kotak Detail Acara (Pop-up "Pelajari Lebih Lanjut")</h4>
                            <p className="text-xs text-gray-500 -mt-2">Setiap kotak akan ditampilkan saat pengunjung mengklik "Pelajari Lebih Lanjut". Anda bisa menambah, menghapus, dan mengatur setiap kotak.</p>""",
    """                                </div>
                            </div>
                        )}

                        {activeSection === 'details' && (
                            <div className="space-y-4 animate-fade-in">
                                <p className="text-xs text-gray-500 -mt-2">Setiap kotak akan ditampilkan saat pengunjung mengklik "Pelajari Lebih Lanjut". Anda bisa menambah, menghapus, dan mengatur setiap kotak.</p>"""
)

# 5. Details Section End & Form Section Start
content = content.replace(
    """                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs uppercase tracking-widest text-[#00f0ff] font-bold border-b border-zinc-800 pb-2">Kustomisasi Form Pendaftaran (Google Form Style)</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-900/40 p-4 rounded-xl border border-zinc-800">""",
    """                                </button>
                            </div>
                        )}

                        {activeSection === 'form' && (
                            <div className="space-y-4 animate-fade-in">
                                <p className="text-xs text-gray-500 -mt-2">Silakan atur judul sukses dan kolom data yang wajib diisi oleh peserta saat mendaftar.</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-900/40 p-4 rounded-xl border border-zinc-800">"""
)

# 6. Form Section End
content = content.replace(
    """                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-zinc-800">""",
    """                                </button>
                            </div>
                        )}

                        <div className="flex justify-end gap-3 pt-6 border-t border-zinc-800">"""
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done resetting tabs.")
