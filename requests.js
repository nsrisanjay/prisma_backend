const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//import the express module 
const exp=require('express')
//create the mini application
const flashcard=exp.Router()

// get all flashcards
flashcard.get('/flashcards', async (req, res) => {
    const flashcards = await prisma.flashcard.findMany();
    res.json(flashcards);
  });
  
// post a new flash card
flashcard.post('/flashcards', async (req, res) => {
    const { question, answer } = req.body;
    const newFlashcard = await prisma.flashcard.create({
      data: { question, answer },
    });
    res.json(newFlashcard);
  });

// update a flashcard
flashcard.put('/flashcards/:id', async (req, res) => {
    const { id } = req.params;
    const numberId = Number(id)
    const { question, answer } = req.body;
    const updatedFlashcard = await prisma.flashcard.update({
      where: { id: numberId },
      data: { question, answer },
    });
    res.json(updatedFlashcard);
  });
  
// delete a flashcard
flashcard.delete('/flashcards/:id', async (req, res) => {
    const { id } = req.params;
    const numberId = Number(id)
    await prisma.flashcard.delete({
      where: { id: numberId },
    });
    res.status(204).end();
  });
  
  

