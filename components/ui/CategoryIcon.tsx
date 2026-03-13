'use client'
import { Category } from "@/src/generated/prisma/client"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"


type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({category}: CategoryIconProps) {
    const params = useParams<{category: string}>()
  return (
    <div className={` ${params.category === category.slug ? 'bg-amber-500 text-white' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b ${category.slug === 'all' ? 'bg-indigo-500 text-white' : ''}`}>  
        <div className="relative size-16">
            <Image
                src={`/icon_${category.slug}.svg`}
                alt={`Imagen de la categoria ${category.name} `}
                fill
            />
        </div>
        <Link href={`/order/${category.slug}`}>
            {category.name}        
        </Link>
    </div>
  )
}
