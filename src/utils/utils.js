const arrayChunk = (list, size) => list.reduce((a,b,i,g) => !(i % size) ? a.concat([g.slice(i, i+size)]) : a, []);

export {
	arrayChunk
};