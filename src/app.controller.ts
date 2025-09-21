import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { codeReview } from './utils';
import { minify } from 'terser';
import CleanCSS from 'clean-css';

@Controller()
export class AppController {
  private componentMap = {
    af184b72: null,
  };
  constructor(private readonly appService: AppService) {}

  @Post('/components')
  async saveComponents(
    @Body()
    body: {
      components: {
        id: string;
        code: string;
        css: string;
        type: string;
      }[];
    },
  ) {
    console.log('body', body);
    const { components } = body;

    // 代码审查
    for (const component of components) {
      const errors = codeReview(component.code);
      if (errors.length > 0) {
        return {
          code: 'error',
          data: errors,
          message: '代码安全检查未通过',
        };
      }
    }

    // 代码压缩
    const finalComponents = [];
    for (const { id, code, css } of components) {
      const component = {
        id,
        code: '',
        css: '',
      };
      finalComponents.push(component);
      if (code) {
        component.code = (
          await minify(code, {
            compress: {
              drop_console: true,
              drop_debugger: true,
              passes: 2,
            },
            mangle: {
              properties: {
                regex: /^_/,
              },
            },
            output: {
              comments: false,
              beautify: false,
            },
          })
        ).code;
      }
      if (css) {
        component.css = new CleanCSS({
          level: 2, // 启用高级优化
          compatibility: '*', // 启用所有兼容性模式
          inline: ['all'], // 启用所有内联优化
        }).minify(css).styles;
      }
    }
    this.componentMap['af184b72'] = finalComponents;

    return {
      code: 'success',
      data: {
        pageId: 'af184b72',
      },
    };
  }

  @Get('/components')
  getComponents(@Query() { id }: { id?: string }) {
    const components = this.componentMap[id];
    if (!components || !components.length)
      return {
        code: 'success',
        data: {
          components: [],
        },
      };
    return {
      code: 'success',
      data: {
        components,
      },
    };
  }

  @Get('/getDataSource')
  getDataSource() {
    return {
      code: 'success',
      data: [
        {
          label: '数据一',
          value: '1',
        },
        {
          label: '数据二',
          value: '2',
        },
      ],
    };
  }
}
