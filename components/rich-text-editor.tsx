"use client"

import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import Image from "@tiptap/extension-image"
import Heading from "@tiptap/extension-heading"
import TextAlign from "@tiptap/extension-text-align"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  editable?: boolean
  className?: string
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Write something...",
  editable = true,
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Image,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <div className={cn("border rounded-md", className)}>
      {editable && editor && <EditorToolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className={cn(
          "prose prose-slate dark:prose-invert max-w-none w-full focus:outline-none p-4",
          "prose-headings:my-3 prose-p:my-2 prose-ul:my-2 prose-ol:my-2",
          "min-h-[200px]",
        )}
      />
    </div>
  )
}

interface EditorToolbarProps {
  editor: Editor
}

function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) {
    return null
  }

  const addLink = () => {
    const url = window.prompt("URL")
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    }
  }

  const addImage = () => {
    const url = window.prompt("Image URL")
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className="border-b p-2 flex flex-wrap gap-1 items-center bg-muted/30">
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn("size-8", editor.isActive("bold") ? "bg-muted" : "")}
        aria-label="Bold"
      >
        <Bold className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn("size-8", editor.isActive("italic") ? "bg-muted" : "")}
        aria-label="Italic"
      >
        <Italic className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn("size-8", editor.isActive("underline") ? "bg-muted" : "")}
        aria-label="Underline"
      >
        <UnderlineIcon className="size-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn("size-8", editor.isActive("heading", { level: 1 }) ? "bg-muted" : "")}
        aria-label="Heading 1"
      >
        <Heading1 className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn("size-8", editor.isActive("heading", { level: 2 }) ? "bg-muted" : "")}
        aria-label="Heading 2"
      >
        <Heading2 className="size-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn("size-8", editor.isActive("bulletList") ? "bg-muted" : "")}
        aria-label="Bullet List"
      >
        <List className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn("size-8", editor.isActive("orderedList") ? "bg-muted" : "")}
        aria-label="Ordered List"
      >
        <ListOrdered className="size-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={addLink}
        className={cn("size-8", editor.isActive("link") ? "bg-muted" : "")}
        aria-label="Add Link"
      >
        <LinkIcon className="size-4" />
      </Button>
      <Button variant="ghost" size="icon" type="button" onClick={addImage} className="size-8" aria-label="Add Image">
        <ImageIcon className="size-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={cn("size-8", editor.isActive({ textAlign: "left" }) ? "bg-muted" : "")}
        aria-label="Align Left"
      >
        <AlignLeft className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={cn("size-8", editor.isActive({ textAlign: "center" }) ? "bg-muted" : "")}
        aria-label="Align Center"
      >
        <AlignCenter className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={cn("size-8", editor.isActive({ textAlign: "right" }) ? "bg-muted" : "")}
        aria-label="Align Right"
      >
        <AlignRight className="size-4" />
      </Button>
      <div className="flex-1" />
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="size-8"
        aria-label="Undo"
      >
        <Undo className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="size-8"
        aria-label="Redo"
      >
        <Redo className="size-4" />
      </Button>
    </div>
  )
}
