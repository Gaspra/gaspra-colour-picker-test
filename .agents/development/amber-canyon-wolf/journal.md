# Activity Journal: amber-canyon-wolf

## [2026-07-15T11:55:00+01:00] - Backend & Foundation Setup

- **Time to Complete**: 5 minutes
- **Key Outcomes**:
  - Appended standard .NET build ignore rules to [../../.gitignore](../../.gitignore)
  - Created ASP.NET Core minimal web project file [../../src/GaspraColourPicker.csproj](../../src/GaspraColourPicker.csproj) and configured it to serve static files in [../../src/Program.cs](../../src/Program.cs)
  - Created development ports config in [../../src/Properties/launchSettings.json](../../src/Properties/launchSettings.json) and placeholder static file [../../src/wwwroot/index.html](../../src/wwwroot/index.html)
  - Created xUnit test project [../../src/GaspraColourPicker.Tests/GaspraColourPicker.Tests.csproj](../../src/GaspraColourPicker.Tests/GaspraColourPicker.Tests.csproj) and configured references and `Microsoft.AspNetCore.Mvc.Testing` package
  - Wrote integration tests in [../../src/GaspraColourPicker.Tests/RoutingTests.cs](../../src/GaspraColourPicker.Tests/RoutingTests.cs)
  - Added solution configuration file [../../src/GaspraColourPicker.slnx](../../src/GaspraColourPicker.slnx)
- **Key Decisions**:
  - Excluded the `GaspraColourPicker.Tests` nested directory from the main `GaspraColourPicker.csproj` file compilation using `<Compile Remove="GaspraColourPicker.Tests\**" />` and related remove rules. This prevents compiler duplicate type/namespace issues caused by nested project paths.
  - Used `Microsoft.AspNetCore.Mvc.Testing` for integration testing of static file routing to ensure standard TDD practices are set up correctly.
- **Validation**:
  - Ran `dotnet test` successfully on `GaspraColourPicker.slnx`, passing both routing integration tests.
  - Started the server locally and ran `Invoke-WebRequest` to hit `http://localhost:5000`, confirming successful retrieval of the placeholder page content.
- **Follow-ups**:
  - None.

---
