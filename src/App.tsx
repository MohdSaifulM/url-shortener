// import React from 'react';

function App() {
	return (
		<div className="dark:bg-gray-700 h-screen flex flex-col justify-center items-center font-light">
			<div className="mb-6">
				<label htmlFor="url-input" className="block mb-2 text-3xl text-gray-500 dark:text-white">Input URL to shorten</label>
				<input type="text" id="url-input" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
			</div>
			<button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Submit</button>
		</div>
	);
}

export default App;
