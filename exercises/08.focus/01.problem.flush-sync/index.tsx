import { useRef, useState } from 'react'
import * as ReactDOM from 'react-dom/client'

function EditableText({
	id,
	initialValue = '',
	fieldName,
	inputLabel,
	buttonLabel,
}: {
	id?: string
	initialValue?: string
	fieldName: string
	inputLabel: string
	buttonLabel: string
}) {
	const [edit, setEdit] = useState(false)
	const [value, setValue] = useState(initialValue)
	const inputRef = useRef<HTMLInputElement>(null)
	// 🐨 add a button ref here

	return edit ? (
		<form
			method="post"
			onSubmit={(event) => {
				event.preventDefault()
				// here's where you'd send the updated value to the server
				// 🐨 wrap these calls in a flushSync
				setValue(inputRef.current?.value ?? '')
				setEdit(false)
				// 🐨 after flushSync, focus the button with the button ref
			}}
		>
			<input
				required
				ref={inputRef}
				type="text"
				id={id}
				aria-label={inputLabel}
				name={fieldName}
				defaultValue={value}
				onKeyDown={(event) => {
					if (event.key === 'Escape') {
						// 🐨 wrap this in a flushSync
						setEdit(false)
						// 🐨 after the flushSync, focus the button
					}
				}}
				onBlur={(event) => {
					// 🐨 wrap these in a flushSync
					setValue(event.currentTarget.value)
					setEdit(false)
					// 🐨 after the flushSync, focus the button
				}}
			/>
		</form>
	) : (
		<button
			aria-label={buttonLabel}
			// 🐨 add a ref prop for the button
			type="button"
			onClick={() => {
				// 🐨 wrap this in a flushSync
				setEdit(true)
				// 🐨 after the flushSync, select all the text of the input
			}}
		>
			{value || 'Edit'}
		</button>
	)
}

function App() {
	return (
		<main>
			<button>Focus before</button>
			<div className="editable-text">
				<EditableText
					initialValue="Unnamed"
					fieldName="name"
					inputLabel="Edit project name"
					buttonLabel="Edit project name"
				/>
			</div>
			<button>Focus after</button>
		</main>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
