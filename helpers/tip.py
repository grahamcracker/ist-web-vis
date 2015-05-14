filter = {
    'text': {'$regex' : "watch.*"}
}

projection = {
    "text": True,
    "_id": False
}
