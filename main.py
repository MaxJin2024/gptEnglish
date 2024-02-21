import csv

from openai import OpenAI

SKIP_COUNT = 0
LIMIT_COUNT = 100
# 初始化OpenAI API
client = OpenAI(api_key="xxxx")


# 调用API
def get_category_words(category: str):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        #max_tokens=100,
        messages=[
            {"role": "system", "content": "你是初中英语老师"},
            {"role": "user",
             "content": f"请给我{category}类别中的最常用英语单词，数量不超过30，每个单词给一个中文和一个例句，格式如下:\"单词,中文,例句\", 不需要解释，也不需要编号"}
        ]
    )

    return completion.choices[0].message.content


def parse_row(row):
    # 去掉开始的编号，按逗号分隔解析出单词、中文、例句
    parts = row.split(',')
    word = parts[0].strip()
    if '. ' in word:
        word = parts[0].split('. ')[1].strip()
    chinese = parts[1].strip() if len(parts) >= 2 else ""
    sentence = parts[2].strip() if len(parts) >= 3 else ""
    return word, chinese, sentence


def main():
    # 读取category.txt文件
    with open('category.txt', 'r') as category_file:
        categories = category_file.read().splitlines()

    # 打开words.csv文件以写入模式
    with open('words.csv', 'a', newline='') as csv_file:
        # 创建CSV写入器
        csv_writer = csv.writer(csv_file)

        # 写入CSV文件头部
        if SKIP_COUNT == 0:
            csv_writer.writerow(['分类', '单词', '中文', '例句'])
        else:
            categories = categories[SKIP_COUNT:]
        # 遍历每个类别，调用get_category_words方法，将结果写入CSV文件
        count = 0
        for category in categories:
            print(f"正在处理类别：{category}，共{len(categories)}个类别，已完成{count}个类别")
            result = get_category_words(category)
            lines = result.splitlines()
            for line in lines:
                # 如果是空行直接跳过
                if line == "":
                    continue
                word, chinese, sentence = parse_row(line)
                csv_writer.writerow([category, word, chinese, sentence])

            count = count + 1
            if count >= LIMIT_COUNT:
                break


if __name__ == "__main__":
    main()
