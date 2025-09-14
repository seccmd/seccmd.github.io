# 02. SQLModel 入门

SQLModel 是一个 SQLAlchemy 的替代品，它使创建数据库模型更简单。

本文是一个新手指引，帮你运行第一个 SQLModel 示例代码。

首选创建虚拟环境 [venv](venv) 并激活后，再安装 SQLModel 软件包。

## Example 01

创建一个数据库模型，并使用 SQLModel 创建一个数据库连接。

```python
from sqlmodel import Field, SQLModel, Session, create_engine

class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    secret_name: str
    age: int | None = None

hero_1 = Hero(name="Deadpond", secret_name="Dive Wilson")
hero_2 = Hero(name="Spider-Boy", secret_name="Pedro Parqueador")
hero_3 = Hero(name="Rusty-Man", secret_name="Tommy Sharp", age=48)


engine = create_engine('sqlite:///database.db')

SQLModel.metadata.create_all(engine)

with Session(engine) as session:
    session.add(hero_1)
    session.add(hero_2)
    session.add(hero_3)
    session.commit()
```

## Example 02

查询刚才创建的数据。

```python
from sqlmodel import Field, Session, SQLModel, create_engine, select

class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    secret_name: str
    age: int | None = None

engine = create_engine("sqlite:///database.db")

with Session(engine) as session:
    statement = select(Hero).where(Hero.name == "Spider-Boy")
    hero = session.exec(statement).first()
    print(hero.name)
```

## 参考链接

- https://sqlmodel.tiangolo.com/