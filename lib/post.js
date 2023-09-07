import path from "path";
import fs from "fs"
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html"

const postDirectory = path.join(process.cwd(), "posts"); //全てのディレクトリからpostsを指定

// mdファイルのデータを取り出す関数
export function getPostsData () {
  const fileNames = fs.readdirSync(postDirectory); // 配列としてfileを取得
  const allPostsData = fileNames.map((filename) => {
    const id = filename.replace(/\.md$/, "") // ファイル名を取得

    //マークダウンファイルを文字列で取得
    const fullPath = path.join(postDirectory, filename) //パスを指定
    const fileContent = fs.readFileSync(fullPath, "utf-8") // コンテンツを指定したパスの中から文字列として取得

    const matterResult = matter(fileContent) //メタデータを読み込みさせる

    //returnで返す
    return{
      id,
      ...matterResult.data //matterResultは配列になっている
    }
  })
  return allPostsData
}

// getStaticPathで使うパスを取得
export function getAllPathIds () {
  const fileNames = fs.readdirSync(postDirectory); // 配列としてfileを取得
  return fileNames.map((filename) => {
    return {
      params: {
        id: filename.replace(/\.md$/, "") // ファイル名を取得
      }
    }
  })
  /*
  [この返しを期待している
    {
      params: {
        id: "ssr-ssg"
      }
    },
    {
      params: {
        id: "next-react"
      }
    }
  ]
  */
}


//idに基づいてブログデータを返す
export async function getPostData(id) {
  const filePath = path.join(postDirectory, `${id}.md`); //パスを取得
  const fileContent = fs.readFileSync(filePath, "utf-8") //コンテンツを取得

  // mdファイル用
  const matterResult = matter(fileContent)
  //htmlとして解析する用
  const blogContent = await remark().use(html).process(matterResult.content)
  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    ...matterResult.data
  }
}
