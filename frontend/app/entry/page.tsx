import {useState} from "react";

export default function Page() {
    const [content, setContent] = useState<undefined | string>()

    const handleSave = () => {

    }

    return (
        <div>
            <h1>Your reflections entry</h1>
            <div>
                <div>
                    <span>saturday, 27.04</span>
                    <span>0</span>
                </div>
                <div>
                    <form onSubmit={handleSave}>
                        <textarea name="content"
                                  value={content}
                                  placeholder="Write your reflections here.."
                                  onChange={(e) => setContent(e.target.value)}>
                        </textarea>
                    </form>
                </div>
            </div>
        </div>
    )
}