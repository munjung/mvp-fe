export interface Part {
    id: number
    name: string
}

export interface DamageCategory {
    id: number
    category: string 
    part?: Part[]
}