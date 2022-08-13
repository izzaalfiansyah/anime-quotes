import { Route } from '@solidjs/router';
import { Routes } from '@solidjs/router';
import { Link } from '@solidjs/router';
import { useNavigate } from '@solidjs/router';

import Index from './views/index';
import Detail from './views/detail';
import Search from './views/search';

export default () => {
	let search;
	let navigate = useNavigate();

	function handleSearch(e) {
		e.preventDefault();
		navigate('/search?page=1&q=' + search.value);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="sticky z-20 top-0 left-0 right-0 min-h-14 shadow-sm bg-white lg:flex items-center justify-between p-4">
				<Link
					href="/"
					className="text-xl font-semibold no-underline text-gray-800 block lg:text-left text-center"
				>
					<span className="text-purple-500">ALF-NIME</span> QUOTES
				</Link>
				<div className="text-right lg:mt-0 mt-4">
					<form on:submit={handleSearch} className="relative w-400px max-w-full">
						<input
							type="text"
							ref={search}
							className="rounded-full w-full border border-gray-100 px-3 py-1 outline-none focus:bg-gray-50 transition"
							placeholder="Cari Quotes..."
						/>
						<button className="outline-none absolute top-0 bottom-0 right-0 rounded-full border border-gray-100 bg-white px-4">
							Cari
						</button>
					</form>
				</div>
			</div>
			<div lg="px-200px" className="p-4">
				<Routes>
					<Route path="/" component={Index}></Route>
					<Route path="/detail/:anime" component={Detail}></Route>
					<Route path="/search" component={Search}></Route>
				</Routes>
			</div>
			<div className="text-center p-4">&copy; 2022 - <a href="https://izzaalfiansyah.github.io" target="_blank">Muhammad Izza Alfiansyah</a></div>
		</div>
	);
};
