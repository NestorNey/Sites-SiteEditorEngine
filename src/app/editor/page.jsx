'use client'

import { Editor } from "@/components/editor/Editor";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const style = useSearchParams().get("style");

    return (
        <div>
            <Editor style={ style } />
        </div>
    );
};
