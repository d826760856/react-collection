import { useImperativeHandle, useRef, useState } from "react"

import type { Ref } from "react"

type SonProps = {
  ref?: Ref<HTMLInputElement>
}

function Son({ ref }: SonProps) {
  return <input ref={ref} />
}

type ComponentRefType = {
    switchText: (text: string) => void
}

function Component({ ref }: { ref: Ref<ComponentRefType> }) {
    const [text, setText] = useState<string>('这是一个测试文字')

    const switchText = (text: string) => {
        setText(text)
    }

    useImperativeHandle(ref, () => {
        return { switchText }
    }, [])

    return(<div>{text}</div>)
}

function InputRefFather() {
    const inputRef = useRef<HTMLInputElement>(null)
    const onClick = () => {
        console.log(inputRef)
        inputRef.current?.focus()
    }

    const componentRef = useRef<ComponentRefType>(null)
    const onText = () => {
        componentRef.current?.switchText('变更后的文字')
    }

    return (
        <>
            <Son ref={inputRef} />
            <button onClick={onClick}>你好</button>
            <Component ref={componentRef}></Component>
            <button onClick={onText}>改变文字</button>

        </>
    )
}

export default InputRefFather