const booksController = (Book) => {
  
  const getBooks = async (req,res) => {
    try {
      const {query} = req
      const response = await Book.find(query)
      if (response.length == 0){
        return res.status(202).json({message: 'No matches found'})
      } 
      else {
        return res.json(response) 
      }
    } 
    catch(err){
      console.log(err)
      res.status(500).json({message:"Internal Server Error"})
      throw err
    }
  }
  
  const postBook = async (req,res) => {
    try {
      const book = new Book (req.body)
      await book.save()
      return res.status(201).json(book)
    }
    catch (err) {
      console.log(err)
      res.status(500).json({message:"Internal Server Error"})
      throw err
    }
  }

  const getBookByID = async (req,res) => {
    try {
      const {params} = req
      const response = await Book.findById(params.bookId)
      if(response == null){
        return res.json({message: "No matches found"})
      }
      else {
        return res.json(response)
      }
    }
    catch (err){
      console.log(err)
      res.status(500).json({message:"Internal Server Error"})
      throw err
    }
  }

  const putBookById = async(req,res) => {
    try {
        const {params,body} = req
        const response = await Book.updateOne({
          _id: params.bookId
        }, {
          $set: {
            title: body.title,
            genre: body.genre,
            author: body.author,
            read:  body.read
          }
        })
      return res.status(202).json(response)
    }
    catch (err){
    console.log(err)
    res.status(500).json({message:"Internal Server Error"})
    throw err
    }
  }

  const deleteBookById = async(req,res)=>{
     try{
    const {params} = req
    await Book.findByIdAndDelete(params.bookId)
    return res.status(202).json({message:'Book succesfully deleted'})
    }
    catch (err) {
    console.log(err)
    res.status(500).json({message:"Internal Server Error"})
    throw err
    }
  }
  
return {getBooks, postBook, getBookByID, putBookById,deleteBookById}
}

module.exports = booksController
