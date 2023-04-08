import Head from 'next/head';
const About = () => {
  return (
    <div>
    <Head>
      <title>Birthday List | About </title>
    </Head>
      <main className="bg-white px-10 sm:px-11 md:px-12 pt-20 max-w-3xl mx-auto w-screen">
        <div className='flex justify-start'>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl">About 🤔</h1>
        </div>      

        <p className="mb-4 text-gray-500">Welcome to this funky yet lame birthday list website! This site was built for one reason: we love birthdays! And we know that you do too.
  My friend Xue Rui inspired me to create this site.</p>
      </main>
    </div>
  );
}

export default About