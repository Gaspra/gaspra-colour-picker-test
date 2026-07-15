# Instructions: Backend & Foundation Setup

- **Status**: Completed
- **Assigned Role**: Developer (Backend & Foundation)
- **Codename**: amber-canyon-wolf
- **Dependencies**: None

## Definition of Ready

- The Technical Product Owner (`ivory-glacier-falcon`) has scoped requirements in [product-scope.md](../../product/product-scope.md).
- The repository structure is defined and the `src` folder exists.

## Task Description

Initialize the .NET Web Application within the `src/` directory to serve as the backend host. Set up ASP.NET Core minimal hosting to serve the static frontend assets from `wwwroot/`. Ensure proper development setup including `.gitignore` configuration to prevent building outputs from being tracked, and a testing project framework to enforce a Test-Driven Development (TDD) approach.

All development must be isolated inside the `src/` folder. Do not place any source, build, or config files outside `src/` (except updates to root-level documentation and `.gitignore`).

## Task Checklist

- [x] Initialize a new .NET Web project (Minimal API) named `GaspraColourPicker` inside `src/`.
- [x] Configure `src/Program.cs` to enable static file serving (`app.UseStaticFiles()` and `app.UseDefaultFiles()`).
- [x] Create the `src/wwwroot/` folder and add a placeholder `index.html` with a basic test page to verify static file routing works.
- [x] Update the root `.gitignore` at the repository root to ensure all .NET build output directories (`bin/`, `obj/`), user-specific files, and IDE configurations are properly ignored.
- [x] Ensure the project builds successfully using `dotnet build`.
- [x] Setup a testing project (e.g., `GaspraColourPicker.Tests` using xUnit) inside `src/` to test backend configuration, endpoints, or routing.
- [x] Add at least one automated unit/integration test verifying that static pages/endpoints are served correctly.
- [x] Verify that running `dotnet run` from `src/` allows visiting the server (e.g. `http://localhost:5000` or the default port) and loads the placeholder static HTML file.

## Handoff Note

As you work, please:
1. Mark checklist items in this file as completed `[x]`.
2. When all tasks are finished, change the header metadata in this file to `Status: Completed`.
3. Append a chronological entry summarizing your work in [journal.md](journal.md). If it does not exist, create it.
4. Notify the Project Manager (`golden-canyon-eagle`) and the USER that the task is complete.
