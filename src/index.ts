import express, {Request, Response} from 'express'

const app = express()

const port = 3000

app.get('/', (req: Request, res: Response) => {
    res.send("Hello world")
})

app.post('/v1/categories', (req: Request, res: Response) => {
    res.send("create category")
})

app.get('/v1/categories', (req: Request, res: Response) => {
    res.send("get all categories")
})

app.get('/v1/categories/:id', (req: Request, res: Response) => {
    res.send("get category by id")
})

app.put('/v1/categories/:id', (req: Request, res: Response) => {
    res.send("update category by id")
})

app.delete('/v1/categories/:id', (req: Request, res: Response) => {
    res.send("delete category by id")
})

app.listen(port, () => {
    console.log(`Server running at port ${port} `)
})

type  Category = {
    id: number,
    name: string,
    description?: string,
    image?: string
    position: number,
    parent_id?: number
    status: CategoryStatus,
    created_at: Date,
    updated_at: Date,
}

enum CategoryStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    DELETED = "deleted"
}
