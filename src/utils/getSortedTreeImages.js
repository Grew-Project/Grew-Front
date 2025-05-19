const getSortedTreeImages = treeType => {
  const treeImages = import.meta.glob('../assets/trees/*.png', {
    eager: true,
    import: 'default',
  })

  return Object.entries(treeImages)
    .filter(([path]) => path.includes(treeType))
    .sort(([a], [b]) => {
      const regex = new RegExp(`${treeType}(\\d+)`)
      const numA = parseInt(a.match(regex)?.[1] || '0')
      const numB = parseInt(b.match(regex)?.[1] || '0')
      return numA - numB
    })
    .map(([, value]) => value)
}

export default getSortedTreeImages
