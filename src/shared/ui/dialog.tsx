export default function Dialog({state, children}){
	return <>
		{state ? <div>
			{children}
		</div>}
	</>
}