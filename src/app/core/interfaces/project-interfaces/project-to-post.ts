export interface ProjectToPost {
    name: string,
    description: string,
    from: Date ,//"YYYY-MM-DD",
    to: Date ,//"YYYY-MM-DD"
    domain: string,
    skills: string[] | number[],
    internalName: string
}
