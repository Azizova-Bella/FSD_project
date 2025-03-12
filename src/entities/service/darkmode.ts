
export const getInitialDarkMode = (): boolean => {
	const savedMode = localStorage.getItem('darkMode')
	return savedMode ? JSON.parse(savedMode) : false
 }
 
 export const toggleDarkMode = (currentMode: boolean): boolean => {
	const newMode = !currentMode
	localStorage.setItem('darkMode', JSON.stringify(newMode))
	return newMode
 }
 
 export const applyDarkMode = (isDarkMode: boolean): void => {
	const root = document.documentElement
	if (isDarkMode) {
	  root.classList.add('dark')
	} else {
	  root.classList.remove('dark')
	}
 }
	 