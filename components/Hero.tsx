export const Hero = () => {
  return (
    <section className="text-center mb-20">
      <h1 className="font-extrabold tracking-tight text-5xl text-gray-900 sm:text-6xl dark:text-white">
        Accurate Public Holiday Data
        <br />
        <span className="text-blue-600 dark:text-blue-400">
          For Every Country/Region
        </span>
      </h1>
      <p className="mx-auto mt-6 text-xl max-w-3xl text-gray-600 dark:text-gray-300">
        Free and open-source API providing comprehensive public holiday
        information for 60 countries/regions worldwide. Perfect for scheduling,
        calendar apps, and HR systems.
      </p>
      <div className="flex flex-col mt-10 gap-4 justify-center sm:flex-row">
        <a
          href="#try-it"
          className="rounded-lg font-semibold bg-blue-600 shadow-lg text-white py-4 px-8 transition-colors hover:bg-blue-700"
        >
          Try It Now
        </a>
        <a
          href="#documentation"
          className="bg-white rounded-lg font-semibold shadow-lg py-4 px-8 transition-colors text-gray-900 dark:bg-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          View Documentation
        </a>
      </div>
    </section>
  )
}
