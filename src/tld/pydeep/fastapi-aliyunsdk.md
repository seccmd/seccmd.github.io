# 基于 FastAPI + AliyunSDK 集成示例代码

## 目的

调用阿里云SDK，读取阿里云轻量应用服务器的相关信息，并通过FastAPI对外提供查询服务。

### api.py

```python
from fastapi import FastAPI
from aliapi import AliAPI

app = FastAPI()
@app.get("/vps")
async def get_vps():
    return await AliAPI.main_async(None)
```

### aliapi.py

```python
# -*- coding: utf-8 -*-
# This file is auto-generated, don't edit it. Thanks.
import os
import sys

from dotenv import load_dotenv
from typing import List

from alibabacloud_swas_open20200601.client import Client as SWAS_OPEN20200601Client
from alibabacloud_credentials.client import Client as CredentialClient
from alibabacloud_tea_openapi import models as open_api_models
from alibabacloud_swas_open20200601 import models as swas__open20200601_models
from alibabacloud_tea_util import models as util_models
from alibabacloud_tea_util.client import Client as UtilClient

load_dotenv()  # Load environment variables from .env

class AliAPI:
    def __init__(self):
        pass

    @staticmethod
    def create_client() -> SWAS_OPEN20200601Client:
        """
        使用凭据初始化账号Client
        @return: Client
        @throws Exception
        """
        # 工程代码建议使用更安全的无AK方式，凭据配置方式请参见：https://help.aliyun.com/document_detail/378659.html。
        credential = CredentialClient()
        config = open_api_models.Config(
            # 您的AccessKey ID,
            access_key_id=os.environ['ALIBABA_CLOUD_ACCESS_KEY_ID'],
            # 您的AccessKey Secret,
            access_key_secret=os.environ['ALIBABA_CLOUD_ACCESS_KEY_SECRET']
        )
        # Endpoint 请参考 https://api.aliyun.com/product/SWAS-OPEN
        config.endpoint = os.environ['ENDPOINT']
        return SWAS_OPEN20200601Client(config)

    @staticmethod
    def main(
        args: List[str],
    ) -> None:
        client = AliAPI.create_client()
        list_instances_request = swas__open20200601_models.ListInstancesRequest(
            region_id=os.environ['REGION_ID']
        )
        runtime = util_models.RuntimeOptions()
        try:
            # 复制代码运行请自行打印 API 的返回值
            abc = client.list_instances_with_options(list_instances_request, runtime)
            print(abc.body)
            return abc.body
        except Exception as error:
            # 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
            # 错误 message
            print(error.message)
            # 诊断地址
            print(error.data.get("Recommend"))
            UtilClient.assert_as_string(error.message)

    @staticmethod
    async def main_async(
        args: List[str],
    ):
        client = AliAPI.create_client()
        list_instances_request = swas__open20200601_models.ListInstancesRequest(
            region_id='ap-southeast-1'
        )
        runtime = util_models.RuntimeOptions()
        try:
            # 复制代码运行请自行打印 API 的返回值
            return await client.list_instances_with_options_async(list_instances_request, runtime)
        except Exception as error:
            # 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
            # 错误 message
            print(error.message)
            # 诊断地址
            print(error.data.get("Recommend"))
            UtilClient.assert_as_string(error.message)


if __name__ == '__main__':
    AliAPI.main(sys.argv[1:])

```

### requirements.txt

```bash
python -m venv .venv
python -m pip install --upgrade pip

pip install "fastapi[standard]"
pip install python-dotenv
pip install alibabacloud_swas_open20200601==4.0.0
```

## 参考

查询轻量服务器所有可用地域列表
- https://next.api.aliyun.com/api/SWAS-OPEN/2020-06-01/ListRegions?tab=DOC&lang=PYTHON

获取实例列表
- https://next.api.aliyun.com/api/SWAS-OPEN/2020-06-01/ListInstances