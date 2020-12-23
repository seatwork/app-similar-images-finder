/**
 * --------------------------------------------------------
 * Renderer Process
 * Author: Ai Chen
 * Copyright (c) 2020 Cloudseat.net
 * --------------------------------------------------------
 */
const controls = require('./controls')
const grid = require('./grid')
const viewer = require('./viewer')

controls.onScanCompleted = function(result) {
    result = flatten(result)
    viewer.setGallery(result)

    grid.render(result)
    grid.onSelectedOpen = pos => viewer.open(pos)
    grid.onSelectedChanged = pos => viewer.slide(pos)
}

function flatten(list) {
    const result = []
    list.forEach((group, index) => {
        group.forEach(image => {
            image.group = index + 1
            image.dimension = image.width + '×' + image.height
            image.hsize = formatBytes(image.size)
            image.percent = Math.round(image.similarity * 100) + '%'
            result.push(image)
        })
    })
    return result
}

function formatBytes(bytes) {
    const units = ['B', 'K', 'M', 'G', 'T']
    let index = 0
    bytes = parseFloat(bytes)
    while (Math.abs(bytes) >= 1024) {
        bytes = bytes / 1024
        index++
        if (index === units.length - 1) break
    }
    bytes = index > 0 ? bytes.toFixed(index - 1) : bytes
    return parseFloat(bytes) + units[index]
}
