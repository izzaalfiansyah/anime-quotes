import { Link } from '@solidjs/router';
import axios from 'axios';
import { Show } from 'solid-js';
import { createMemo } from 'solid-js';
import { For } from 'solid-js';
import { onMount } from 'solid-js';
import { createSignal } from 'solid-js';

export default () => {
	const [data, setData] = createSignal([]);
	const [search, setSearch] = createSignal('');

	const filteredData = createMemo(() => {
		return data().filter((item) => item.anime.toLowerCase().indexOf(search().toLowerCase()) >= 0);
	});

	function get() {
		axios.get('https://katanime.vercel.app/api/getlistanime').then((res) => {
			setData(res.data.result);
		});
	}

	onMount(() => {
		get();
	});

	return (
		<>
			<div className="mb-4">
				<input
					type="text"
					className="bg-white border border-gray-100 p-3 w-full outline-none rounded-full transition"
					focus="border-purple-500 ring-2 ring-purple-300"
					placeholder="Cari Anime..."
					value={search()}
					onInput={(e) => setSearch(e.currentTarget.value)}
				/>
			</div>
			<Show when={filteredData().length <= 0}>
				<div className="bg-white rounded w-full p-4 text-center shadow-sm">Data tidak tersedia.</div>
			</Show>
			<div lg="grid-cols-3" md="grid-cols-2" className="grid grid-cols-1 gap-2">
				<For each={filteredData()}>
					{(item) => (
						<Link
							href={'/detail/' + item.anime.toLowerCase().replace(/ /gi, '-')}
							className="bg-white rounded p-4 py-8 shadow-sm transition block no-underline text-gray-800 flex justify-between items-center border-2 border-transparent"
							hover="bg-purple-100 border-purple-500 text-purple-800"
						>
							<div className="pr-4 truncate">{item.anime}</div>
							<span className="rounded bg-gray-800 text-white shadow-sm px-2 text-xs">
								{item.totalKata}
							</span>
						</Link>
					)}
				</For>
			</div>
		</>
	);
};
