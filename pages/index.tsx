import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlinePlusCircle, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PrismaClient } from '@prisma/client';
const port = process.env.PORT || 3001;

const prisma = new PrismaClient()

interface FormData {
  name: string
  date: string
  id: string
}

const Home = ({notes}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [form, setForm] = useState<FormData>({name: '', date: '', id: ''})
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function create(data: FormData) {
    try {
      const response = await fetch(`/api/create`, {
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
        toast.success('Birthday recorded');
        return responseData;
      } else {
        console.error(`Failed to create note: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Failed to create note: ${error}`);
    }
  }  

  async function deleteNote(id: string) {
    try {
     fetch(`/api/note/${id}`, {
       headers: {
         "date-Type": "application/json",
       },
       method: 'DELETE'
     }).then(() => {
       refreshData()
       toast.success('Updated info');
     })
    } catch (error) {
     console.log(error); 
    }
  }

  const handleSubmit = async (data: FormData) => {
    if (!data.name || !data.date) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
     create(data) 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="pt-20 bg-white">
      <ToastContainer />
      <div className='flex justify-center'>
        <h1 className="py-10 text-3xl font-bold tracking-tight text-black md:text-5xl">Birthday List 🎉</h1>
      </div>      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (form.name.trim() === "" || form.date.trim() === "") {
            toast.error("Please fill in all fields.");
          } else {
            handleSubmit(form);
          }
        }}
        className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border-2 rounded border-gray-300 p-2 focus:outline-none text-black bg-white"
        />
        <input
          placeholder="Date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border-2 rounded border-gray-300 p-2 focus:outline-none text-black bg-white"
        />
        <button
          type="submit"
          className="bg-green-500 text-white rounded-full px-4 py-2 font-bold flex justify-center gap-2 hover:bg-green-600 transition-colors duration-300 items-center focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <span>
            <AiOutlinePlusCircle />
          </span>
          <span>Add Birthday</span>
        </button>
      </form>
      <div className="w-auto min-w-[25%] max-w-min my-10 mx-auto space-y-6 flex flex-col items-stretch">
        <ul>
          {notes.map((note: any) => (
            <li key={note.id} className="p-2 hover:scale-110 transition-all duration-300 transform-origin-center bg-white">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="w-full text-lg font-medium text-gray-900 md:text-xl">{note.name} 🎂</h3>
                  <p className="text-sm text-gray-500 w-32 mb-4 text-left md:mb-0">{note.date}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setForm({ name: note.name, date: note.date, id: note.id })}
                    className="hover:bg-yellow-500 text-black py-2 px-3 rounded font-bold focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <AiOutlineEdit className="text-base" />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="hover:bg-red-500 text-black py-2 px-3 rounded font-bold focus:outline-none focus:ring-2 focus:ring-green-400"
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
