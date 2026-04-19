from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

app = FastAPI() 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://192.168.1.2:3000","https://eda-agent-backbone.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Get
@app.get("/")
async def root():
    return {"message": "Hello World"}

#Get with ID

@app.get("/items/{item_id}")
async def read_item(item_id):
    return {"item_id": item_id}

# #Post 
# @app.post("/items/")
# async def create_item(item: Item):
#     return item

# #Post with pydantic model
@app.post("/items/")
async def create_item(item: Item):
    item_dict = item.model_dump()
    if item.tax:
        tax_price = item.price + item.tax
        item_dict.update({"tax_price": tax_price})
    return item_dict

# #Put (Request body + path parameters)
# @app.put("/items/{item_id}")
# async def update_item(item_id: int, item: Item):
#     return {"item_id": item_id, "item": item.model_dump()}

#Put (Request body + path parameters + query parameters) q is query parameter, optional, default is None
@app.put("/items/{item_id}")  
async def update_item(item_id: int, item: Item, q: str | None = None):
    result = {"item_id": item_id, "item": item.model_dump()}
    if q:
        result.update({"q": q})
    return result

# #Delete
# @app.delete("/items/{item_id}")
# async def delete_item(item_id: int):  
#   return {"item_id": item_id, "message": "Item deleted"}

# import enum //Use Enum when you want control + safety + clarity over a small set of known options
        
