import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { prisma } from '../lib/prisma'
import { AiOutlinePlusCircle, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

interface Notes{
  notes: {
    id: string
    name: string
    date: string
  }[]
}

interface FormData {
  name: string
  date: string
  id: string
}

const Home = ({notes}: Notes) => {
  const [form, setForm] = useState<FormData>({name: '', date: '', id: ''})
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function create(data: FormData) {
    try {
      const response = await fetch('http://localhost:3000/api/create', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
  
      if (response.ok) {
        const responseData = await response.json();
  
        if (data.id) {
          await deleteNote(data.id);
        }
  
        setForm({ name: '', date: '', id: '' });
        refreshData();
      } else {
        console.error(`Failed to create note: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Failed to create note: ${error}`);
    }
  }  


  async function deleteNote(id: string) {
    try {
     fetch(`http://localhost:3000/api/note/${id}`, {
       headers: {
         "date-Type": "application/json",
       },
       method: 'DELETE'
     }).then(() => {
       refreshData()
     })
    } catch (error) {
     console.log(error); 
    }
  }

  const handleSubmit = async (data: FormData) => {
    try {
     create(data) 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="pt-20">
      <h1 className="text-center font-bold text-2xl py-10">Birthday Reminder 🎉</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
        className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border-2 rounded border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
        />
        <textarea
          placeholder="Date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border-2 rounded border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
        />
        <button
          type="submit"
          className="bg-green-500 text-white rounded-full px-4 py-2 font-bold flex justify-center gap-2 hover:bg-green-600 transition-colors duration-300 items-center focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <span>
            <AiOutlinePlusCircle />
          </span>
          <span>Add Note</span>
        </button>
      </form>
      <div className="w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch">
        <ul>
          {notes.map((note) => (
            <li key={note.id} className="border-b border-gray-300 p-2 hover:scale-110 transition-all duration-300 transform-origin-center">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-white">{note.name}</h3>
                  <p className="text-sm text-gray-200">{note.date}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setForm({ name: note.name, date: note.date, id: note.id })}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded font-bold focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <AiOutlineEdit className="text-base" />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded font-bold focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <AiOutlineDelete className="text-base" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home


export const getServerSideProps: GetServerSideProps = async () => {
  const notes = await prisma.note.findMany({
    select: {
      name: true,
      id: true,
      date: true
    }
  })

  return {
    props: {
      notes
    }
  }
}