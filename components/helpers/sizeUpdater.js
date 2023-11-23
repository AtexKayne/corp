import { globalState } from './globalState'

export const sizeUpdater = (updater) => {
    if (updater[globalState.currentSize] && typeof updater[globalState.currentSize] === 'function') {
        return updater[globalState.currentSize]()
    }
}