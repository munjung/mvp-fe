export interface Part {
    id: number
    name: string
}

export interface DamageCategory {
    id: number
    category: string 
    part?: Part[]
}

export interface DamageParts {
    category: string
    name: string
}