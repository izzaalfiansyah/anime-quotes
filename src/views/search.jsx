import { Link } from '@solidjs/router';
import { useSearchParams } from '@solidjs/router';
import axios from 'axios';
import { For } from 'solid-js';
import { onMount } from 'solid-js';
import { createResource } from 'solid-js';

export default () => {
	const [searchParams, setSearchParams] = useSearchParams();

	function get({ page, kata }) {
		window.scrollTo(0, 0);
		return axios.get('https://katanime.vercel.app/api/carikata', {
			params: {
				kata: kata,
				page: page,
			},
		});
	}

	const [data] = createResource(
		() => ({
			page: searchParams.page,
			kata: searchParams.q,
		}),
		get,
	);

	onMount(() => {
		if (!searchParams.page) {
			setSearchParams({ page: 1 });
		}
	});

	return (
		<>
			<div className="text-center mb-4 text-2xl font-semibold uppercase">
				"{searchParams.q}" - Halaman {searchParams.page}
			</div>
			{data.loading && <div className="text-center bg-white rounded p-3 shadow-sm">Memuat...</div>}
			<div className="grid grid-cols-1 gap-3">
				<For each={data()?.data.result}>
					{(item) => (
						<div className="bg-white shadow-sm rounded p-4">
							<div className="border text-center p-4 min-h-200px flex items-center justify-center relative transition hover:bg-purple-100 rounded">
								<button
									className="absolute top-0 m-2 px-3 rounded py-1 right-0 outline-none bg-gray-800 text-white text-xs"
									on:click={() => {
										navigator.clipboard.writeText(`"${item.indo}" \n~ ${item.character}`);
										alert('teks berhasil dicopy ke clipboard');
									}}
								>
									COPY
								</button>
								<div lg="text-lg" className="w-full text-center mt-8">
									"{item.indo}"
									<div lg="text-base" className="mt-3 italic text-gray-500 text-sm ">
										~ {item.character} - <Link href={'/detail/' + item.anime.toLowerCase().replace(/ /gi, '-')} className="text-blue-500 no-underline">{item.anime}</Link> ~
									</div>
								</div>
							</div>
						</div>
					)}
				</For>
			</div>
			<div className="mt-4 text-center">
				<button
					className="bg-gray-800 text-white rounded px-3 py-1 mx-1 disabled:bg-gray-500"
					disabled={parseInt(searchParams.page) <= 1}
					on:click={() => {
						setSearchParams({ page: parseInt(searchParams.page) + 1 });
					}}
				>
					Sebelumya
				</button>
				<button
					className="bg-gray-800 text-white rounded px-3 py-1 mx-1 disabled:bg-gray-500"
					disabled={data()?.data.next ? false : true}
					on:click={() => {
						setSearchParams({ page: parseInt(searchParams.page) + 1 });
					}}
				>
					Selanjutnya
				</button>
			</div>
		</>
	);
};
