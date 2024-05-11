import path from "path";
import { type Configuration, ProgressPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

enum BuildMode {
  Production = "production",
  Development = "development",
}

class ModeService {
  private isProduction: boolean;
  private isDevelopment: boolean;

  constructor() {
    this.isProduction = process.env.BUILD_MODE === BuildMode.Production;
    this.isDevelopment = !this.isProduction;
  }

  getMode(): BuildMode {
    return this.isProduction ? BuildMode.Production : BuildMode.Development;
  }

  isProd(): boolean {
    return this.isProduction;
  }

  isDev(): boolean {
    return this.isDevelopment;
  }
}

const modeService = new ModeService();

const devServer: DevServerConfiguration = {
  port: 1337,
  hot: true,
};

const config: Configuration = {
  mode: modeService.getMode(),
  entry: path.resolve(__dirname, "src", "index.ts"),
  devtool: modeService.isDev() ? "inline-source-map" : false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.[fullhash].js",
    clean: true,
  },
  devServer: modeService.isDev() ? devServer : undefined,
  resolve: {
    extensions: [".tsx", ".ts", ".js", "jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      minify: modeService.isProd(),
    }),
    modeService.isDev() &&
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
      }),
    modeService.isDev() && new ProgressPlugin(),
  ],
};

export default config;
