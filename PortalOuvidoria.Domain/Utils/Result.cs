using System.Net;

namespace PortalOuvidoria.Domain.Utils;
public class Result<T>
{
    private Result(Boolean isSuccess, T value, Error error)
    {
        if (( isSuccess && error != Error.None ) || ( !isSuccess && error == Error.None ))
        {
            throw new ArgumentException("Invalid error", nameof(error));
        }

        this.IsSuccess = isSuccess;
        this.Value = value;
        this.Error = error;
    }

    public Boolean IsSuccess { get; }
    public Boolean IsFailure
    {
        get => !IsSuccess;
    }

    public T Value { get; }
    public Error Error { get; }
    public static Result<T> Success(T value)
    {
        return new(true, value, Error.None);
    }

    public static Result<T> Failure(Error error)
    {
        return new(false, default, error);
    }
}

public sealed record Error(Int32 Code, String Description)
{
    public static readonly Error None = new(0, String.Empty);
}

public static class ResultExtensions
{
    public static TOut Match<T, TOut>(this Result<T> result, Func<T, TOut> onSuccess, Func<Error, TOut> onFailure)
    {
        return result.IsSuccess ? onSuccess(result.Value) : onFailure(result.Error);
    }
}