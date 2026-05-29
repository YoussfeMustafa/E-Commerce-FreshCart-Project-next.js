"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // إذا كنت تريد الانتقال لصفحة نتائج البحث
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // الطريقة الأولى: الانتقال لصفحة النتائج مع وضع الكلمة في الـ URL
      router.push(`/search?q=${searchTerm}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex-1 max-w-[500px] hidden md:block">
      <div className="absolute right-2 top-1.5 z-10">
        <button type="submit">
          <Search className="bg-green-700 p-1 text-white rounded-full cursor-pointer hover:bg-green-800 transition-colors" size={28} />
        </button>
      </div>
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for product, brands and more..." 
        className="w-full h-10 pl-5 pr-14 text-sm font-medium rounded-full bg-white border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all" 
      />
    </form>
  );
}